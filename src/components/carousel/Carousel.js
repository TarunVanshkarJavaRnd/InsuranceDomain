import React from 'react';
import insurance1 from './images/Insurance-1.jpg'
import insurance2 from './images/insurance-2.jpg';
import insurance3 from './images/insurance-3.jpg';

const Carousel = () => {
    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={insurance1} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className='h1 fw-bolder'>Life Insurance</h5>
                                <p className='h4 fw-bolder'>Life insurance is a policy which covers the risk of premature death. If, during the term of the policy, the life insured dies, the policy promises to pay a death benefit.</p>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src={insurance2} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className='h1 fw-bolder'>Property Insurance</h5>
                                <p className='h4 fw-bolder'>Home insurance policy covers your home and its contents against natural and man-made calamities such as earthquakes, floods, fire, theft, burglaries and any other risks.</p>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src={insurance3} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className='h1 fw-bolder'>Vehicle Insurance</h5>
                                <p className='h4 fw-bolder'>Vehicle insurance is insurance for cars, trucks, motorcycles, and other road vehicles. Its primary use is to provide financial protection against physical damage or bodily injuries</p>
                            </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;
