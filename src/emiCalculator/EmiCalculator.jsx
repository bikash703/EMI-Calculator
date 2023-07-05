import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js';
import '../emiCalculator/emicalculator.scss';

ChartJS.register(Tooltip, ArcElement, Legend)

const EmiCalculator = () => {

    const [principle, setPrinciple] = useState('')
    const [interest, setInterest] = useState('')
    const [tenure, setTenure] = useState('')
    const [emi, setEmi] = useState('')
    const [payable, setPayable] = useState('')
    const [totalPayable, setTotalPayable] = useState('')

    const CalculateEmi = (e) => {
        e.preventDefault()
        let p = parseFloat(principle)
        let r = parseFloat(interest) / 12 / 100
        let n = parseFloat(tenure) * 12
        let E = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

        setEmi(E)
        setPayable((E * n) - parseFloat(principle))
        setTotalPayable(E * n)
    }

    const data = {
        labels: ["Total Interest", "Principle Loan Amount"],
        datasets: [{
            data: [parseFloat(payable).toFixed(), principle],
            backgroundColor: ["#e63946", "#14213d"],
            borderWidth: 0
        }]
    }

    return (
        <div className='emicalculator'>
            <main>
                <section>
                    <h2>EMI Calculator</h2>
                    <form >
                        <div className="group">
                            <div>
                                <label >Loan amount (₹):</label>
                                <input type="text" className='principle' required value={principle} onChange={(e) => setPrinciple(e.target.value)} />
                            </div>
                            <div>
                                <label >Interest rate (%):</label>
                                <input type="text" className='interest' required value={interest} onChange={(e) => setInterest(e.target.value)} />
                            </div>
                            <div>
                                <label >Loan term (Years):</label>
                                <input type="text" className='tenure' required value={tenure} onChange={(e) => setTenure(e.target.value)} />
                            </div>
                        </div>
                        <button type="submit" onClick={(e) => CalculateEmi(e)}>Calculate</button>
                    </form>
                </section>
                <article>
                    <div className="firstSide">
                        <div>
                            <p>Monthly EMI</p>
                            <span>₹ {parseFloat(emi).toFixed()}</span>
                        </div>
                        <div>
                            <p>Loan Amount</p>
                            <span>₹ {parseFloat(principle).toFixed()}</span>
                        </div>
                        <div>
                            <p>Interest Payable</p>
                            <span>₹ {parseFloat(payable).toFixed()}</span>
                        </div>
                        <div>
                            <p>Total Payable</p>
                            <span>₹ {parseFloat(totalPayable).toFixed()}</span>
                        </div>
                    </div>
                    <div className="secondSide">
                        <Doughnut data={data}/>
                    </div>
                </article>
            </main>
        </div>
    )
}

export default EmiCalculator
