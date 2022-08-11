package com.thru.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thru.model.NFT;
import com.thru.model.NFTProject;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Primary
@Service
public class MoralisNFTService implements NFTService{

    //@CacheEvict(value = "nft", key = "#walletAddress")
    private void deleteCache(String walletAddress) {}

    //@Cacheable(value = "nft", key = "#walletAddress")
    @Override
    public List<NFT> getNft(String walletAddress) {
        try {
            Response response = getNftInfoByAPI(walletAddress);

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(response.body().string(), Map.class);
            List<Map<String, Object>> nftInfo = (ArrayList<Map<String, Object>>) map.get("result");

            List<NFT> nftList = new ArrayList<>();

            OkHttpClient client = new OkHttpClient();

            for (Map<String, Object> item : nftInfo) {
                NFT nftModel = new NFT();

                nftModel.setContract((String) item.get("token_address"));
                nftModel.setTokenId((String) item.get("token_id"));
                nftModel.setOwnerAddress((String) item.get("owner_of"));

                String description = "";
                String name = "";
                String image = "";

                String tokenUri = (String) item.get("token_uri");
                String metadata = (String) item.get("metadata");

                if (tokenUri != null) {
                    Request tokenRequest = new Request.Builder().url(tokenUri).get()
                            .addHeader("Accept", "application/json")
                            .build();
                    Response tokenResponse = client.newCall(tokenRequest).execute();
                    if (tokenResponse.code() == 200) {
                        ObjectMapper tokenMapper = new ObjectMapper();
                        Map<String, Object> tokenMap = tokenMapper.readValue(tokenResponse.body().string(), Map.class);

                        name = (String) tokenMap.get("name");
                        description = (String) tokenMap.get("description");
                        image = (String) tokenMap.get("image");
                    }
                }

                if ((image == "") && (metadata != null)){
                    ObjectMapper tokenMapper = new ObjectMapper();
                    Map<String, Object> tokenMap = tokenMapper.readValue(metadata, Map.class);

                    name = (String) tokenMap.get("name");
                    description = (String) tokenMap.get("description");
                    image = (String) tokenMap.get("image");
                }

                if (image.startsWith("ipfs://")) {
                    image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
                }

                nftModel.setName(name);
                nftModel.setDescription(description);
                nftModel.setOriginUrl(image);

                nftList.add(nftModel);
            }

            return nftList;

        } catch (Exception e) {
            deleteCache(walletAddress);
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Map<String, NFTProject> getNftProject(String walletAddress) {
        try {
            Response response = getNftInfoByAPI(walletAddress);

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(response.body().string(), Map.class);
            List<Map<String, Object>> nftInfo = (ArrayList<Map<String, Object>>) map.get("result");

            Map<String, NFTProject> nftProjectMap = new HashMap<>();

            for (Map<String, Object> item : nftInfo) {
                String contract = (String) item.get("token_address");

                if (!nftProjectMap.containsKey(contract)) {
                    NFTProject nftProject = new NFTProject();
                    nftProject.setContract(contract);
                    nftProject.setName((String) item.get("name"));

                    nftProjectMap.put(contract, nftProject);
                }
            }

            return nftProjectMap;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private Response getNftInfoByAPI(String walletAddress) throws Exception {
        String url = "https://deep-index.moralis.io/api/v2/" + walletAddress + "/nft?chain=eth&format=decimal";
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(url).get()
                .addHeader("Accept", "application/json")
                .addHeader("X-API-Key", "JgcIROYh2hC3pZINC2ndZwtWA3OyYHRU9O0a8C8QsuY5eBAte1FdoQBOzUXsrYgw")
                .build();
        Response response = client.newCall(request).execute();

        return response;
    }
}
