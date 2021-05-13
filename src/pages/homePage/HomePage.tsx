import React, {useState, useEffect} from 'react';

import {Modal as BootstrapModal} from 'bootstrap';
import NavBar from '../../layout/header/Header';

const Modal = () => {
  useEffect(() => {
    const myModal = new BootstrapModal('#MyBootstrapModal');
    myModal.show();

    const myModalDom = document.getElementById('MyBootstrapModal');
    myModalDom?.addEventListener('hidden.bs.modal', () => {
      console.log('izpulnih se');
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="MyBootstrapModal"
      // data-bs-backdrop="static"
      // data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Modal title
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">...</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = (): JSX.Element => {
  const [show, setShow] = useState(false);

  return (
    <>
      <NavBar />

      <button type="button" onClick={() => setShow(true)}>
        Click me
      </button>

      {show ? <Modal /> : null}
    </>
  );
};

export default HomePage;
