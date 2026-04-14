
export const authorize = (module=null,action=null, ...roles) => {
  return (req, res, next) => {
    const user=req.user;
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "wrong user" });
    }

    if(!user.permission?.[module]?.[action])
    {
        return res.status(403).json({message: "access denied"});
    }
    next();
  };
};