import React from "react";
import Navbar from "@/components/navbar/Navbar";

function contact() {
  return (
    <div>
      <Navbar></Navbar>

      <div className="px-4 pt-5 my-5 text-center ">
        <h1 className="display-4 fw-bold">Contact Ust</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            We understand that social media can sometimes feel overwhelming or
            even isolating, which is why we strive to make our platform a
            welcoming space where everyone is encouraged to participate and
            contribute. We believe that by bringing people together and
            facilitating genuine interactions, we can help to break down
            barriers and bring more empathy and understanding to the world.
            Whether you're here to share your passion for a particular hobby,
            connect with friends and family, or explore new communities and
            ideas, we hope that [Social Media App] can be a place where you feel
            supported, inspired, and empowered. Thank you for being a part of
            our community!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Primary button
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Secondary
            </button>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <img
              src="/assets/community.png"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width={300}
              height={300}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default contact;
