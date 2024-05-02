import React from 'react';

function Cc() {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`maladie: Alzheimer
        Alzheimer’s disease is an irreversible, progressive brain disorder that slowly destroys memory and thinking skills and, eventually, the ability to carry out the simplest tasks
      traitement :No treatments stop or reverse its progression, though some may temporarily improve symptoms but medication and management strategies may temporarily improve symptoms.
        Medication:
        Cognition-enhancing medication
        Improves mental function, lowers blood pressure and may balance mood.
        
        `);
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Questionnaire</h2>
                <h5 className="text-xl font-semibold mb-4">Do you feel any of the following symptoms? Reply high or low or no</h5>

                <form onSubmit={handleSubmit}>
                    {["headache", "cough", "restlessness", "fever", "sunken eyes", "sore throat", "blurred vision"].map((question, index) => (
                        <div key={index} className="mb-4">
                            <p className="font-semibold">{question}</p>
                            <div className="mt-2">
                                <input type="radio" id={`high_q${index}`} name={`question_${index}`} value="high" className="mr-2" />
                                <label htmlFor={`high_q${index}`} className="mr-4">High</label>

                                <input type="radio" id={`low_q${index}`} name={`question_${index}`} value="low" className="mr-2" />
                                <label htmlFor={`low_q${index}`} className="mr-4">Low</label>

                                <input type="radio" id={`none_q${index}`} name={`question_${index}`} value="none" className="mr-2" />
                                <label htmlFor={`none_q${index}`}>None</label>
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Cc;
