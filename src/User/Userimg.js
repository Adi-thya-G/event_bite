const userimg = (name) => {
    const nameParts = name.split(" ");
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
    const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";
    return `${firstNameInitial}${lastNameInitial}`; // Return as a string
    // Alternatively, return [firstNameInitial, lastNameInitial]; // Return as an array
}

export default userimg;