export const canEditUser = async (req, res, next) => {
    const { id } = req.body;
    const { id_user, role } = req.user;

    if (role !== "admin" && id_user !== parseInt(id)) {
        return res
            .status(403)
            .json({ error: "Forbidden: you can only edit your own profile" });
    }

    next();
};
