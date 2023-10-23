import React from 'react';

const Footer = () => {
    return (
        <div className='container-fluid border px-0 footer'>
            <div className="container-fluid w-100 mx-0 px-0">

                <footer className="text-white text-center text-lg-start bg-dark">
                    {/* Grid container */}
                    <div className="container p-4">
                        {/* Grid row start */}
                        <div className="row mt-4">
                            {/* Grid column start */}
                            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-4">About company</h5>

                                <p>
                                    Welcome to Insurance Domain, your trusted partner in the world of insurance. At Insurance Domain, we are dedicated to providing you with comprehensive insurance solutions that offer peace of mind and financial security. With many years of experience in the industry, we have built a strong reputation for reliability, transparency, and exceptional customer service.
                                </p>
                                <div className="mt-4">
                                    {/*  Facebook  */}
                                    <a type="button" className="btn btn-floating btn-light btn-lg"><i className="fab fa-facebook-f"></i></a>
                                    {/* Dribbble */}
                                    <a type="button" className="btn btn-floating btn-light btn-lg mx-2"><i className="fab fa-dribbble"></i></a>
                                    {/* Twitter */}
                                    <a type="button" className="btn btn-floating btn-light btn-lg me-2"><i className="fab fa-twitter"></i></a>
                                    {/* Google */}
                                    <a type="button" className="btn btn-floating btn-light btn-lg"><i className="fab fa-google-plus-g"></i></a>
                                    {/* Linkedin  */}
                                </div>
                            </div>
                            {/* Grid column end */}

                            {/* Grid column start */}
                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-4 pb-1">Career Search</h5>

                                <div className="form-outline form-white mb-4">
                                    <input type="text" id="formControlLg" className="form-control form-control-lg" />
                                    <label className="form-label my-1" htmlFor="formControlLg" onClick={() => alert('Currenty no job is available')}>Search</label>
                                </div>

                                <ul className="fa-ul" style={{ marginLeft: '1.65em' }}>
                                    <li className="mb-3">
                                        <span className="fa-li"><i className="fas fa-home"></i></span><span className="ms-2">M.P Nagar, India</span>
                                    </li>
                                    <li className="mb-3">
                                        <span className="fa-li"><i className="fas fa-envelope"></i></span><span className="ms-2">career@insuranceDomain.com</span>
                                    </li>
                                    <li className="mb-3">
                                        <span className="fa-li"><i className="fas fa-phone"></i></span><span className="ms-2">0755 - 456123</span>
                                    </li>
                                </ul>
                            </div>
                            {/* Grid column end */}

                            {/* Grid column start */}
                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-4">Opening hours</h5>

                                <table className="table text-center text-white">
                                    <tbody className="fw-normal">
                                        <tr>
                                            <td>Mon - Fri</td>
                                            <td>6:00PM - 3:30AM</td>
                                        </tr>
                                        <tr>
                                            <td>Saturday</td>
                                            <td>OFF</td>
                                        </tr>
                                        <tr>
                                            <td>Sunday</td>
                                            <td>OFF</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Grid column end */}
                        </div>
                        {/* Grid row end */}
                    </div>
                    {/* Grid container */}

                    {/* Copyright */}
                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2023 Copyright:
                        <span style={{ color: 'gold' }}> Insurance</span>Domain
                    </div>
                    {/* Copyright */}
                </footer>

            </div>
        </div>
    );
}

export default Footer;
