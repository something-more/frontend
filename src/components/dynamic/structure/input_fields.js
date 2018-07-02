import React from 'react';

export function PasswordField(field) {
  return (
    <div className="form-group">
      <label htmlFor={field.id}>
        {field.label}
      </label>
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
  );
}

export function TitleField(field) {
  return (
    <div
      className="input-group"
      style={{ marginBottom: '20px' }}
    >
      <input
        className="form-control"
        placeholder="Title"
        type="text"
        {...field.input}
        required
      />
      <span className="input-group-btn">
        <button
          type="submit"
          className="btn btn-info pull-right"
        >
          {field.label}
        </button>
      </span>
    </div>
  );
}
