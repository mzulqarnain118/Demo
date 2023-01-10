import React from 'react';
import {useSelector} from 'react-redux';
const ProgressBar = () => {
    const next_btn_state = useSelector((state) => state.user.next_btn);
    const progressSteps = useSelector(state =>state.algoData.progess);
    
    return (
        <div className="col-md-11">
                            <div className="steps">
                                <progress id="progress" value={progressSteps?.value} max="100"></progress>
                                <div className="step-item">
                                    <button className={!progressSteps?.step1 ?  "step-button text-center" : "step-button-active" } type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true"
                                            aria-controls="collapseOne">
                                        1
                                    </button>
                                    <div className="step-title">
                                        {!localStorage.getItem('timeSeires') ? 'Commodity' : 'Commodity'}
                                    </div>
                                </div>
                                <div className="step-item">
                                    <button  className={!progressSteps?.step2 ?  "step-button text-center collapsed" : "step-button-active collapsed" } type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                            aria-expanded="false" aria-controls="collapseTwo" disabled={next_btn_state}>
                                        2
                                    </button>
                                    <div className="step-title">
                                        Load Data
                                    </div>
                                </div>
 
                                {/* <div className="step-item">
                                    <button className={!progressSteps?.step3 ?  "step-button text-center collapsed" : "step-button-active collapsed" } type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                            aria-expanded="false" aria-controls="collapseThree" disabled={true}>
                                        3
                                    </button>
                                    <div className="step-title">
                                        Data PreView
                                    </div>
                                </div> */}

                                <div className="step-item">
                                    <button className={!progressSteps?.step3?  "step-button text-center collapsed" : "step-button-active collapsed" }  type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                            aria-expanded="false" aria-controls="collapseThree" disabled={true}>
                                        3
                                    </button>
                                    <div className="step-title">
                                        Run Forecast
                                    </div>
                                </div>

                                <div className="step-item">
                                    <button className={!progressSteps?.step4?  "step-button text-center collapsed" : "step-button-active collapsed" }  type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                            aria-expanded="false" aria-controls="collapseFour" disabled={true}>
                                        4
                                    </button>
                                    <div className="step-title">
                                        Review Results
                                    </div>
                                </div>

                                <div className="step-item">
                                    <button className="step-button text-center collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseFive"
                                            aria-expanded="false" aria-controls="collapseFive" disabled={true}>
                                        5
                                    </button>
                                    <div className="step-title">
                                        Save & Share Model
                                    </div>
                                </div>
                            </div>
                        </div>
    );
}

export default ProgressBar;
