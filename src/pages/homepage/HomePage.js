import React from 'react';
import Carousel from '../../components/carousel/Carousel';

const HomePage = () => {

    return (
        <div>
            <Carousel />

            <div className='container my-5 '>
                <h2>Below are the Insurance policies that we offer:</h2>

                <div className='container'>
                    {/* Life Insurance */}
                    <h3 className='text-warning'>#1 Life Insurance</h3>
                    <div className='container mx-4'>
                        <p className='fw-lighter'>
                            Life Insurance is a contract between a policyholder and the insurance company wherein the insurance company agrees to pay monetary benefits either upon the death of an insured person or upon the maturity of the policy.
                        </p>
                        <p className='fw-lighter'>
                            Policy agreement is a legal document and it gives an exhaustive list of all items, events included & excluded from the policy coverage.
                        </p>
                    </div>

                    {/* Property insurance */}
                    <h3 className='text-warning'>#2 Property Insurance</h3>
                    <div className='container mx-4'>
                        <p className='fw-lighter'>
                            Property insurance provides protection to any property against fire accidents, damage due to weather or loss due to theft. If you have a property such as a building, flat or any other personal property like personal office equipment etc then property insurance covers these items against the unforeseen events.
                        </p>
                    </div>

                    {/* Vehile insurance */}
                    <h3 className='text-warning'>#3 Vehicle Insurance</h3>
                    <div className='container mx-4'>
                        <p className='fw-lighter'>
                            Vehicle insurance (also known as car insurance, motor insurance, or auto insurance) is insurance for cars, trucks, motorcycles, and other road vehicles. Its primary use is to provide financial protection against physical damage or bodily injury resulting from traffic collisions and against liability that could also arise from incidents in a vehicle. Vehicle insurance may additionally offer financial protection against theft of the vehicle, and against damage to the vehicle sustained from events other than traffic collisions, such as keying, weather or natural disasters, and damage sustained by colliding with stationary objects. The specific terms of vehicle insurance vary with legal regulations in each region.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
