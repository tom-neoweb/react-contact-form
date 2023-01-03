import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const FormTemplate = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const formMessage = document.querySelector(".form-message");

    emailjs.sendForm('service_rpanxqa', 'template_bilc9th', form.current, process.env.REACT_APP_ID)
      .then((result) => {
          console.log(result.text);
          form.current.reset();
          formMessage.innerHTML = "<p className='succes'>Message envoyé !</p>";

          setTimeout(() => {
            formMessage.innerHTML = "";
          }, 2500);
      }, (error) => {
          console.log(error.text);
          formMessage.innerHTML = "<p className='error'>Une erreur s'est produite, veuillez réessayer !</p>";

          setTimeout(() => {
            formMessage.innerHTML = "";
          }, 2500);
      });
  };

  return (
    <div className="form-container">
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="name" required/>
            <label>Email</label>
            <input type="email" name="email" required autoComplete='off'/>
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Envoyer" />
        </form>

        <div className="form-message">

        </div>
    </div>
    // ref={form} est un hook qui récupère ce qui est stocké dans les inputs du formulaire
  );
};

export default FormTemplate;