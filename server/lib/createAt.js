module.exports = exports = function createAt (schema, options) {
    schema.add({ created_at: Date });
  
    schema.pre('save',  next => {
      this.created_at = new Date();
      next();
    });
    
    if (options && options.index) {
      schema.path('created_at').index(options.index);
    }
  }