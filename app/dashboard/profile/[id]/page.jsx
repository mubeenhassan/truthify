import React from "react";

const ProfileDetail = async ({ params }) => {
  const { id } = await params;
  return <div>ProfileDetail {id}</div>;
};

export default ProfileDetail;
