import React from "react";
import SectionBorder from "./components/SectionBorder";
import DeleteUserForm from "./components/DeleteUserForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import UpdateProfileInformationForm from "./components/UpdateProfileInformationForm";
import Layout from "../../layouts/Layout";
import { Title } from "@/layouts/Layout/title";

function Profile() {
  return (
    <div>
      <Layout header={(<>
        <Title>
          Perfil
        </Title>
      </>)}>
        <h1 className="text-3xl font-bold text-gray-700"></h1>

        <div className="mx-auto max-w-7xl">
          <UpdateProfileInformationForm />
          <SectionBorder />
          <UpdatePasswordForm />
          <SectionBorder />
          <DeleteUserForm />
        </div>
      </Layout>
    </div>
  );
}

export default Profile;
