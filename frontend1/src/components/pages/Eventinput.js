import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { useSelector } from 'react-redux';
import { Redirect } from '@reach/router';

const Eventinput = (props) => {
    const {account} = useSelector((store) => store);
    const [ options, setOptions ] = useState([]);
    const [ status, setStatus ] = useState(false);

    useEffect(() => {
        if (!!account) {
            fetch("/api/user/nftProject/" + account).then((res) => res.json()).then((res) => {
                setOptions([]);
    
                for (var key in res["nftProjectMap"]) {
                    let dictItem = {"label":  res["nftProjectMap"][key]["name"], "value": res["nftProjectMap"][key]["contract"]};
                    setOptions(options => [...options, dictItem]);
                }
            }).catch((error) => {
                
            });
        }
    }, []);

    const [updateInputs, setUpdateInputs] = useState({
        name: "",
        contractAddress: "",
        datetime: "",
        infoTitle2: "",
        infoTitle3: "",
        infoValue2: "",
        infoValue3: ""
    });

    const { name, contractAddress, datetime, infoTitle2, infoTitle3, infoValue2, infoValue3 } = updateInputs;
    
    const onChange = (e) => {
        const { value, name } = e.target;
        setUpdateInputs({
          ...updateInputs,
          [name]: value
        });
    };

    const selectProject = (e) => {
        const { value } = e;
        setUpdateInputs({
            ...updateInputs,
            ["contractAddress"]: value
        });
    } 

    const saveEvent = async () => {
        if (!name || !contractAddress) {
            alert("이벤트 정보를 입력해주세요.");
            return;
        }

        const data = {
            "title": name,
            "contractAddress": contractAddress,
            "info": JSON.stringify({
                "infoTitle1": "Schedule",
                "infoTitle2": infoTitle2,
                "infoTitle3": infoTitle3,
                "infoValue1": datetime,
                "infoValue2": infoValue2,
                "infoValue3": infoValue3,
            })
        }

        const url = "/api/user/event";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'WalletAddress': account,
            },
            body: JSON.stringify(data)
        });

        if (response.status === 403) {
            window.location.href="/";
        } else if (!response.ok) {
            alert("에러 신고 부탁 드립니다.");
        } else {
            const data = await response.json();
            if (data["result"] === "success") {
                alert("이벤트가 등록되었습니다.");
                setStatus(true);
            } else {
                alert("이벤트 등록에 실패했습니다.");
            }
        }
    }
      
    return (
        <>
        {account
        ?<div>
            {!status
            ?<>
            <section className='jumbotron breadcumb no-bg'>
                <div className='mainbreadcumb'>
                    <div className='container'>
                        <div className='row m-10-hor'>
                            <div className='col-12'>
                                <h1 className='text-center'>Create Event</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='container'>
                <div className="row">
                    <div className="col-lg-10 offset-lg-1 mb-5">
                        <form id="form-create-item" className="form-border" action="#">
                            <div className="field-set">
                                <h5>NFT Project</h5>
                                <div className='dropdownSelect one'><Select className='select1' name="contractAddress" onChange={selectProject} menuContainerStyle={{'zIndex': 999}} defaultValue={contractAddress} options={options} /></div>
                                
                                <div className="spacer-30"></div>

                                <h5>Event Name</h5>
                                <input type="text" name="name" id="name" value={name} className="form-control" placeholder="Event Name" onChange={onChange}/>
                                
                                <div className="spacer-10"></div>

                                <h5>Event Schedule</h5>
                                <input type="datetime-local" name="datetime" id="datetime" value={datetime} className="form-control" placeholder="2022-04-04 10:00:00" onChange={onChange}/>

                                <div className="spacer-10"></div>
                                
                                <h5>Info 1</h5>
                                <input type="text" name="infoTitle2" id="infoTitle2" value={infoTitle2} className="form-control" placeholder="info1 label" onChange={onChange}/>
                                <input type="text" name="infoValue2" id="infoValue2" value={infoValue2} className="form-control" placeholder="info1 value" onChange={onChange}/>
                                
                                <div className="spacer-10"></div>
                                
                                <h5>Info 2</h5>
                                <input type="text" name="infoTitle3" id="infoTitle3" value={infoTitle3} className="form-control" placeholder="info2 label" onChange={onChange}/>
                                <input type="text" name="infoValue3" id="infoValue3" value={infoValue3} className="form-control" placeholder="info2 value" onChange={onChange}/>
                                
                                <div className="spacer-10"></div>
                                <input type="button" className="btn-main" value="Create Event" onClick={saveEvent}/>
                            </div>
                        </form>
                    </div>                                    
                </div>
            </section>
            </>
            :<Redirect noThrow={true} to="/myevents"/>
            }
        </div>
        :<Redirect noThrow={true} to="/"/>
        }
        </>
    );
};

export default Eventinput;
