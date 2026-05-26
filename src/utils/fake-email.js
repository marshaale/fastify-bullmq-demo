const sendFakeEmail = async (data) => {
  console.log("Sending to: ", data.to);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const random = Math.random();
  console.log("Random simulation < 0.5 is failure:", random);

  if (random < 0.5) {
    throw new Error("SMTP server failed");
  }

  console.log("Email sent successfully");
};

export default sendFakeEmail;
