import React from 'react';

export default (field) => {
  return (
    <div className="form-group">
      <label htmlFor={field.id}>{field.label}</label>
      <input
      className="form-control"
      placeholder={field.label}
      type="password"
      {...field.input}
      />
      <small className="text-danger">
        {field.meta.touched ? field.meta.error : ''}
      </small>
    </div>
  )
}
