import React, {useState, useEffect} from "react";
import { Modal } from 'react-bootstrap';
import Select from 'react-select'
import { useSelector } from 'react-redux';
import { Redirect } from '@reach/router';

const EditEventModal = (props) => {
    const {account} = useSelector((store) => store);
    const [ options, setOptions ] = useState([]);
    const {event} = props;
    const [status, setStatus] = useState(true);

    const {setUpdateModalShow} = props;
    
    let info = null;    
    if ("info" in event) {
        info = JSON.parse(event.info);
    }

    const [updateInputs, setUpdateInputs] = useState({
        id: "",
        name: "",
        contractAddress: "",
        datetime: "",
        infoTitle2: "",
        infoTitle3: "",
        infoValue2: "",
        infoValue3: "",
    });

    useEffect(() => {
        if (event) {
            for (var key in options) {
                if (options[key]["value"] === event.contractAddress) {
                    setUpdateInputs({
                        id: event.id,
                        name: event.title,
                        contractAddress: options[key],
                        datetime: info ? info.infoValue1 : "",
                        infoTitle2: info ? info.infoTitle2 : "",
                        infoTitle3: info ? info.infoTitle3 : "",
                        infoValue2: info ? info.infoValue2 : "",
                        infoValue3: info ? info.infoValue3 : "",
                    });
                }
            }
        }
    }, [event]);

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

    const { id, name, contractAddress, datetime, infoTitle2, infoTitle3, infoValue2, infoValue3 } = updateInputs;
    
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

    const closeModal = () => {
        setUpdateModalShow(false);
    }

    const editEvent = async () => {
        if (!name || !contractAddress) {
            alert("이벤트 정보를 입력해주세요.");
            return;
        }

        let initContractAddress = contractAddress;

        if (typeof initContractAddress === "object") {
            initContractAddress = contractAddress.value;
        }

        const data = {
            "id": id,
            "title": name,
            "contractAddress": initContractAddress,
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
            method: 'PUT',
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
                alert("이벤트가 수정되었습니다.");
                setStatus(false);
            } else {
                alert("이벤트 등록에 실패했습니다.");
            }
        }
    }

    return (
        <>
        {status
        ? 
        <Modal {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Body>
                <div className="container">
                    <div className="col-lg-10 offset-lg-1 mb-5">
                        <form id="form-create-item" className="form-border" action="#">
                            <div className="field-set">
                                <h5>NFT Project</h5>
                                <div className='dropdownSelect one'><Select className='select1' name="contractAddress" menuContainerStyle={{'zIndex': 999}} onChange={selectProject} defaultValue={contractAddress} options={options} /></div>
                                
                                <div className="spacer-30"></div>

                                <h5>Event Name</h5>
                                <input type="text" name="name" id="name" className="form-control" placeholder="Event Name" value={name} onChange={onChange} />
                                
                                <div className="spacer-10"></div>

                                <h5>Event Schedule</h5>
                                <input type="datetime-local" name="datetime" id="datetime" className="form-control" placeholder="2022-04-04 10:00:00" value={datetime} onChange={onChange} />

                                <div className="spacer-10"></div>
                                
                                <h5>Info 1</h5>
                                <input type="text" name="infoTitle2" id="infoTitle2" className="form-control" placeholder="info1 label" value={infoTitle2} onChange={onChange} />
                                <input type="text" name="infoValue2" id="infoValue2" className="form-control" placeholder="info1 value" value={infoValue2} onChange={onChange} />
                                
                                <div className="spacer-10"></div>
                                
                                <h5>Info 2</h5>
                                <input type="text" name="infoTitle3" id="infoTitle3" className="form-control" placeholder="info2 label" value={infoTitle3} onChange={onChange} />
                                <input type="text" name="infoValue3" id="infoValue3" className="form-control" placeholder="info2 value" value={infoValue3} onChange={onChange} />
                                
                                <div className="spacer-10"></div>
                                <input type="button" className="btn-modal" value="Edit Event" onClick={editEvent}/>
                                <input type="button" className="btn-modal" value="Close" onClick={closeModal} />
                            </div>
                        </form>
                    </div>                                    
                </div>
            </Modal.Body>
        </Modal>
        : <Redirect noThrow={true} to="/myevents"/>
        }
        </>
    );
};

export default EditEventModal;
