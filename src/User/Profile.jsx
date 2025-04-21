import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import userimg from './Userimg';
import service from '../Appwrite/config';
import { toast } from 'react-toastify';
import menu from '../Appwrite/menu';

function Profile() {
  const userdata = useSelector((state) => state.auth.userData);
  const data = useSelector((state) => state.auth.personalData);
  const [file, setfile] = useState(null);
  const [disabled, setdisable] = useState(true);

  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const pincodeRef = useRef(null);
  const phoneRef = useRef(null);

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      await service.updataData(userdata.$id, {
        name: nameRef.current.value || nameRef.current.defaultValue,
        phone: phoneRef.current.value || phoneRef.current.defaultValue,
        address: addressRef.current.value || addressRef.current.defaultValue,
        pincode: pincodeRef.current.value || pincodeRef.current.defaultValue,
      });

      toast.success('Personal data updated', {
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setdisable(true);
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-6 flex-col">
      <form>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col lg:flex-row items-center mb-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-4 lg:mb-0 lg:mr-10">
              <div className="rounded-full w-28 h-28 sm:w-36 sm:h-36 bg-blue-500 flex justify-center items-center overflow-hidden text-white text-3xl sm:text-5xl font-serif">
                {data.photo_id === null && file === null ? (
                  userimg(String(data?.name))
                ) : (
                  <img
                    src={'../../public/adithya.jpg'}
                    alt="Profile"
                    className="w-full h-full object-cover border-[7px] border-white rounded-full"
                  />
                )}
              </div>
              {file === '' && (
                <label className="flex flex-col items-center mt-2">
                  <p className="text-xs sm:text-sm">Upload photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="text-xs sm:text-sm"
                    onChange={async (e) => {
                      const selectedFile = e.target.files?.[0];
                      if (!selectedFile) return;
                      try {
                        const res = await menu.uploadFile(selectedFile);
                        if (res) {
                          setfile(res.$id);
                        }
                      } catch (err) {
                        console.error('Error uploading image:', err);
                      }
                    }}
                  />
                </label>
              )}
            </div>

            {/* Name Input */}
            <input
              className={`w-full lg:w-[420px] outline-none text-sm sm:text-lg bg-white ${
                disabled ? '' : 'border-b-2 border-purple-400'
              }`}
              type="text"
              disabled={disabled}
              defaultValue={
                data?.name ? data.name[0].toUpperCase() + data.name.slice(1) : ''
              }
              ref={nameRef}
            />
          </div>

          <hr className="mb-4" />
          <h4 className="text-sm sm:text-xl font-mono font-semibold mb-2">Address</h4>
          <input
            className={`w-full outline-none text-xs sm:text-lg ${
              disabled ? '' : 'border-b-2 border-purple-400'
            }`}
            type="text"
            defaultValue={data?.address}
            disabled={disabled}
            ref={addressRef}
          />
          <hr className="my-4" />

          <h4 className="text-sm sm:text-xl font-mono font-semibold mb-2">Pincode</h4>
          <input
            className={`w-20 sm:w-28 outline-none text-xs sm:text-lg ${
              disabled ? '' : 'border-b-2 border-purple-400'
            }`}
            type="text"
            maxLength={6}
            defaultValue={data?.pincode}
            disabled={disabled}
            ref={pincodeRef}
          />

          <hr className="my-4" />
          <h4 className="text-sm sm:text-xl font-mono font-semibold mb-2">Contact Information</h4>
          <p className="text-gray-700 mb-2 font-mono text-[13px] sm:text-[17px]">
            Email: {userdata?.email}
          </p>
          <p className="text-gray-700 font-mono text-[13px] sm:text-[17px]">
            Phone:{' '}
            <input
              className={`w-28 sm:w-40 outline-none text-xs sm:text-lg ${
                disabled ? '' : 'border-b-2 border-purple-400'
              }`}
              type="tel"
              defaultValue={data?.phone}
              maxLength={10}
              disabled={disabled}
              ref={phoneRef}
            />
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className={`py-2 px-4 rounded ${
                disabled
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-black'
              }`}
              type="button"
              disabled={!disabled}
              onClick={() => setdisable(false)}
            >
              Edit Profile
            </button>
            <button
              type="submit"
              onClick={(e) => handlesubmit(e)}
              className={`py-2 px-4 rounded ${
                disabled ? 'bg-gray-300 hover:bg-gray-400' : 'bg-blue-500 text-white'
              }`}
              disabled={disabled}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Profile;
