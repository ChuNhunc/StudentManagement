const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createClass = async (req, res) => {
    try {
        const haveClass = await Class.findOne({
            where: { ClassID: req.params}
        });
        if(haveClass){
            return res.status(400).json({ message: "Lớp đã tồn tại" });
        }
        const newClass = await Class.create(req.body);
        res.json(newClass);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}