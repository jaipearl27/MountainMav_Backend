import { customersModel } from "../model/customersModel.js";
import { teamsModel } from "../model/teamsModel.js";

export const addCustomer = async (userData, images) => {
  try {
    const data = JSON.parse(userData.body);
    let filteredImgUrls = images.map((item) => {
      return item.url;
    });
    // console.log(filteredImgUrls);
    let customerData = {
      email: data?.email,
      gender: data?.gender,
      images: filteredImgUrls,
      packDetails: data?.selectedPlan ? JSON.parse(data?.selectedPlan) : null ,
      generationType: data?.generationType,
    };

    switch (data?.generationType) {
      case "individual":
        customerData.headshotType = data.headshotType;
        break;
      case "customize":
        customerData.customizeData = data.customizeData;
        break;
      case "prompt":
        customerData.promptData = data.promptData;
        break;
      case "individualDating":
        customerData.headshotType = data.headshotType;
        break;
      case "datingCustomize":
        customerData.customizeData = data.customizeData;
        break;
      case "datingPrompt":
        customerData.promptData = data.promptData;
        break;
    }

    const customer = new customersModel(customerData);
    const result = await customer.save();
    if (result) {
      return { status: true, result: result };
    }
  } catch (error) {
    console.error(error);
    return { status: false, message: error.message };
  }
};

export const addTeamsCustomer = async (userData) => {
  try {
    const data = JSON.parse(userData.body);

    let customerData = {
      teamName: data?.companyName,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phone: data?.whatsappNumber,
      role: data?.Role.value,
      teamCount: data?.users,
      totalPrice: Number(data?.price) * Number(data?.users),
      price: Number(data?.price),
      website: data?.website || "",
    };

    const customer = new teamsModel(customerData);
    const result = await customer.save();
    if (result) {
      return { status: true, result: result };
    }
  } catch (error) {
    console.error(error);
    return { status: false, message: error.message };
  }
};
