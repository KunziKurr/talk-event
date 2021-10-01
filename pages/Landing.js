import Head from 'next/head'
import Image from 'next/image'

export default function Landing() {
  return (
    <div>
        <div className="landing">
            <section className="landing_seaction_1">
            {/* <video autoPlay muted loop className="V">
              <source src="../assets/video/Vid1.mp4" type="video/mp4"/>
            </video> */}
                    <h1 className="landing_seaction_1_title">Cleaning Time !!</h1>
                    <span className="landing_seaction_1_span"> 
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </span>
                    <div className="landing_seaction_1_sub_sect"> 
                      <div className="landing_seaction_1_sub_sect_wrapper">
                      <span className="landing_seaction_1_sub_sect_heading"> How clean is your home ?</span>
                        <p className="landing_seaction_1_sub_sect_p"> 
                          Would you give us a chance to train YOU and/or YOUR Domestic 
                          Manager to transform and sparkle up your space like pro ? </p>
                        <span className="landing_seaction_1_sub_sect_b_text"> For only 300/- Join us on the 15th Oct From 9:30 am from transformative session </span>
                        <span className="landing_seaction_1_sub_sect_footer_text"> Get Value for you money... </span>
                        <button className="landing_seaction_1_sub_sect_register"> REGISTER NOW</button>
                      </div>
                    </div>
            </section>
            <section className="landing_section_2">
               
            </section>
        </div>
    </div>
  )
}
