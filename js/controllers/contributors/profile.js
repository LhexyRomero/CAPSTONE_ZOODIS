const db = require('../../connection');

exports.updateProfile = (req, res, next) => {

    let data = req.body;
    let userName = data.userName;
    let contact = data.contact;
    let firstName = data.firstName;
    let middleInitial = data.middleInitial;
    let lastName = data.lastName;
    let email = data.email;
    let address = data.address;
    let type = 1;


    let sql = "UPDATE staff_t SET userName = ?, contact =?, firstName = ?, middleInitial =?, lastName = ?, email=?, address =? WHERE type = ? AND staffID = ?";
    db.get().query(sql, [userName, contact, firstName, middleInitial, lastName, email, address, type, req.session.staffID], (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "Successfully Updated!" });
    });
}

exports.viewProfile = (req, res, next) => {
    let type = 1;

    let sql = "SELECT * FROM staff_t WHERE type =? AND staffID =?";
    db.get().query(sql, [type, req.session.staffID], (err, result) => {
        if (err) return next(err);

        let dataDisplay = {
            firstName           :   result[0].firstName,
            lastName            :   result[0].lastName,
            middleInitial       :   result[0].middleInitial,
            userName            :   result[0].userName,
            email               :   result[0].email,
            contact             :   result[0].contact,
            address             :   result[0].address,
            password            :   result[0].password,
        };

        res.status(200).send({ success: true, detail: "", data:dataDisplay});
    });
}