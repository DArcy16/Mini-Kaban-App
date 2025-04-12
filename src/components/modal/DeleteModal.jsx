import { Modal } from 'antd'
import React from 'react'

const DeleteModal = ({isOpen, setIsOpen, onDelete}) => {
    const handleCancel = () => {
        setIsOpen(false);
    }

  return (
    <Modal footer="" width={"fit-content"} onCancel={handleCancel} closable={false} open={isOpen}>
        <div className='w-96 max-w-full'>
            <h2 className='text-base font-semibold text-center'>Are you sure you want to delete task?</h2>
            <div className='flex justify-center items-center mt-4 gap-4'>
                <button onClick={handleCancel} className='cancel-btn'>
                    Cancel
                </button>
                <button onClick={onDelete} className='delete-btn'>
                    Delete
                </button>
            </div>
        </div>
    </Modal>
  )
}

export default DeleteModal