import { useState } from 'react';

const ModalWarning = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 overflow-hidden z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="absolute inset-0 bg-[rgba(0,0,0,.7)] blur-lg"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999] outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-background text-white outline-none focus:outline-none">
                  <div className="w-full flex justify-center mt-12">
                    <div className="w-8/12 text-lg">
                      Please be aware that this is a demo page, and changes
                      might occur when the aggregator goes live.
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 rounded-b">
                    <button
                      className="text-white bg-secondary-gradient font-bold uppercase text-sm px-10 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalWarning;
