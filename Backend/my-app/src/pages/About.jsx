import React from "react";

const About = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Om Sushi</h1>

      <p>
        Vi levererar sushirecept inspirerade av gamla japanska tekniker, alltid
        med respekt för ursprunget. Genom vår digitala plattform kan kunder inte
        bara laga våra recept, utan också följa berättelserna bakom dem: från
        risfältet i Niigata till fiskmarknaden i Osaka.
      </p>

      <p>
        Vi tror att sushi inte bara är mat – det är en upplevelse. Vi vill att
        varje recept från <strong>Rice N Roll</strong> ska kännas som en resa
        bakåt i tiden, med smaker som representerar hav, tradition och stillhet.
      </p>

      <h2>Vår plats i Stockholm</h2>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <iframe
          title="Stockholm Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.427379330166!2d18.06324047604854!3d59.33459198193898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d2f3c05c3d1%3A0x400af0f661eb040!2sStockholm%2C%20Sweden!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default About;