
export const authorize = () => {
  return (req, res, next) => {
    const user=req.user;
    if (user.role==="admin") {
      return next();
    }


    if(user.role==="employee" || user.role==="user")
    {

      if(!user.permissions)
      {
        return res.status(403).json({
        message: "Access denied: No permissions"
      });
      }
      const modules=Object.keys(user.permissions);
      if(modules.length===0)
      {
        return res.status(403).json({
        message: "Access denied: No permissions"
      });
      }
      for(let module in modules)
      {
       const actions=user.permissions[module];
       if(actions.includes("read") || actions.includes("write"))
       {
            return next()
       }
      }
    }
    
    
  };
};