import React, {useEffect, useState} from "react";
import {Modal} from "@mui/material";
import {ApiKeys} from "../../models/apikeys.models";
import apikeysService from "../../services/apikeys.service";
import {ApikeysResponse} from "../../models/apikeysResponse.model";

const ApiKey = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [apiKeys, setApiKeys] = useState<ApikeysResponse[]>([]);

    const fetchApiKeys = () => {
        // @ts-ignore
        apikeysService.showApi(sessionStorage.getItem('id'))
            .then(res => {
                setApiKeys(res);
            })
            .catch(error => console.error(error));
    };
    const handleNameChange = (event:any) => {
        setName(event.target.value);
    };


    const handleClose = () => {
        setOpen(false);
    };


    const handleOpen = () => {
        if(sessionStorage.getItem('username')) {
            setOpen(true);
            setDescription("");
        }
        else{
            setDescription("Login to continue.")
        }
    };

    const saveApiKey = () => {
        const apiKey = new ApiKeys();
        apiKey.name = name;
        // @ts-ignore
        apiKey.userId=sessionStorage.getItem('id');
        // @ts-ignore
        apiKey.email = sessionStorage.getItem('username');
        apikeysService.saveApiDetails(apiKey)
            .then(() => {
                handleClose();
                fetchApiKeys(); 
            })
            .catch(error => console.error(error));
    };


    useEffect(() => {
        fetchApiKeys();
    }, []);

    return(
        <div style={{
            backgroundImage: `url('header-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center center',
            height: '400px',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            minHeight: '100vh',
        }}>
        <div className="pl-6 flex flex-row pb-10 ">
                <div className="w-1/2 pt-5 mr-18"><p>API KEYS</p></div>
                <div className="w-1/2 pt-5 mr-10">
                    <button onClick={handleOpen} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4  rounded float-right">
                        Create
                    </button>
                </div>
            </div>
            <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0.5rem',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                padding: '1.5rem',
                margin: '0 1.25rem',
                overflowY: 'scroll',
                maxHeight: 'calc(100vh - 10rem)'
            }}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-lg uppercase bg-gray-50">
                    <tr className="bg-purple-100">
                        <th scope="col" className="px-6 py-3">
                            NAME
                        </th>
                        <th>
                            APIKEY
                        </th>
                    </tr>
                    </thead>
                    <tbody className="text-lg">
                    {apiKeys?.map((item: any) => (
                        <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-100">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
                                {item.name}
                            </th>
                            <th>
                                {item.apiKey}
                            </th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal open={open} onClose={handleClose}>
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                    <div className="bg-white w-96 h-44 p-4 rounded-md max-w-sm">
                        <h1 className="text-lg font-bold p-2 ">New API Key</h1>
                        <input
                            className="border border-gray-400 w-full p-2 rounded-md"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <div className="flex flex-row justify-end">
                            <div className="pt-5 pr-5">
                                <button onClick={handleClose} className="border border-gray bg-white  hover:bg-purple-100 text-gray-400 font-bold py-2 px-4 rounded">
                                    Cancel
                                </button>
                            </div>
                            <div className="pt-5">
                                <button onClick={saveApiKey} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div>
            </div>
        </div>
    )
};

export default ApiKey;
