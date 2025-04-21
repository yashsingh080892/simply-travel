import React, { useState } from "react";
import { Modal, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import { assetPrefix } from "../next.config";
import ImageWithAssetPrefix from "./image/image";

const UserTypeSelector = ({ open, onClose }: { open: boolean; onClose: (selectedType: string | null) => void }) => {
    const [selectedType, setSelectedType] = useState("regular");

    const handleSubmit = () => {
        onClose(selectedType);
    };

    return (
        <Modal
            open={open}
            onClose={() => onClose(null)}
            aria-labelledby="user-type-modal"
        >
            <div className="h-screen flex">
                <div className="drop-shadow-xl rounded-2xl bg-white m-auto p-8 w-96">
                    <div className="absolute right-4 top-4">
                        <ImageWithAssetPrefix 
                            height={12} 
                            width={12} 
                            src={assetPrefix + "/close-icon.svg"} 
                            alt="" 
                            className="cursor-pointer"
                            onClick={() => onClose(null)}
                        />
                    </div>
                    <div className="text-xl font-bold mb-6 text-neutral-600">Select User Type</div>
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <FormControlLabel 
                                value="plus" 
                                control={<Radio />} 
                                label="Plus User 1" 
                                className="mb-2"
                            />
                            <FormControlLabel 
                                value="pro" 
                                control={<Radio />} 
                                label="Pro User 1" 
                                className="mb-2"
                            />
                            <FormControlLabel 
                                value="regular" 
                                control={<Radio />} 
                                label="Regular User" 
                            />
                        </RadioGroup>
                    </FormControl>
                    <button 
                        className="ts-t-primary-btn w-full mt-6"
                        onClick={handleSubmit}
                    >
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default UserTypeSelector; 




