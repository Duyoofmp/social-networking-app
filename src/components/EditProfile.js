import React from 'react'
import './EditProfile.css'
export const EditProfile = () => {
  return (
    <div className="container bootstrap snippets bootdey">
    <h1 className="text-primary">Edit Profile</h1>
      <hr/>
	<div className="row">
      <div className="col-md-3">
        <div className="text-center">
          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="avatar img-circle img-thumbnail" alt="avatar"/>
          <h6>Upload a different photo...</h6>
          
          <input type="file" className="form-control"/>
        </div>
      </div>
      
      
      <div className="col-md-9 personal-info">
        <div className="alert alert-info alert-dismissable">
          <a className="panel-close close" data-dismiss="alert">×</a> 
          <i className="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
        </div>
        <h3>Personal info</h3>
        
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label className="col-lg-3 control-label">First name:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" value="dey-dey"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Last name:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" value="bootdey"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Company:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" value=""/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" value="janesemail@gmail.com"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Time Zone:</label>
            <div className="col-lg-8">
              <div className="ui-select">
                <select id="user_time_zone" className="form-control">
                  <option value="Hawaii">(GMT-10:00) Hawaii</option>
                  <option value="Alaska">(GMT-09:00) Alaska</option>
                  <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                  <option value="Arizona">(GMT-07:00) Arizona</option>
                  <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                  <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                  <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                  <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
  </div>
</div>
  )
}
