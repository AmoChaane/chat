import React, { useState } from "react";

interface HistoryItemsProps {
    text: string,
    id: string,
    del: () => void,
    deleteHistoryItem: (id: string) => Promise<void>,
    showResponse: (id: string) => void,
    updateHistoryItem: (id: string, newValue: string) => void
}

export default function HistoryItem({text, del, deleteHistoryItem, id, showResponse, updateHistoryItem}: HistoryItemsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(text);
    let touchTimeout: NodeJS.Timeout;

    const handleLongPress = () => {
        touchTimeout = setTimeout(() => {
          setIsEditing(true);
        }, 500);
      };

      const handleTouchEnd = () => {
        clearTimeout(touchTimeout);
      };

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevent the default right-click context menu
        setIsEditing(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target) setNewValue((event.target as HTMLInputElement).value);
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        setIsEditing(false);
        updateHistoryItem(id, newValue)
        }
    };
    return (
        <div 
            onClick={() => showResponse(id)}
            onContextMenu={(event) => handleContextMenu(event)}
            onTouchStart={handleLongPress}
            onTouchEnd={handleTouchEnd}
            className='history-item actual-history-item d-flex align-items-center justify-content-between' 
        >
            {
                !isEditing ?
                <>
                    <div className="d-flex align-items-center gap-3 history-text" style={{width: "90%"}}>
                        <i className="fa-solid fa-message"></i>
                        <p className='fs-6 m-0'>{newValue}</p>
                    </div>
                    <i onClick={(event) => {
                        event.stopPropagation();
                        deleteHistoryItem(id)
                        del()
                    }} 
                    className="fa-solid fa-trash delete-item"></i>
                </>
                :
                <div className="d-flex gap-3 align-items-center">
                    <i className="fa-solid fa-message"></i>
                    <input
                        type="text"
                        value={newValue}
                        onChange={(event) => handleInputChange(event)}
                        onKeyPress={(event) => handleInputKeyPress(event)}
                        autoFocus
                        className="input-item ps-2"
                    />
                </div>
                    
            }
        </div>
    )
}