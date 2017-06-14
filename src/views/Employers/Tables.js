import React, { Component } from 'react';

class Tables extends Component {

  componentWillMount(){
    console.log(this.props.data,"Employers tabel");

  }

  render() {
    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Employers Table
              </div>

              <div className="card-block">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Comapany</th>
                      <th>Careers Url</th>
                      <th>Linkedin Url</th>
                      <th>Token</th>
                      <th>Account Type</th>
                      <th>Total Jobs</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Slack</td>
                      <td>www.slack.com/careers</td>
                      <td>www.slack.com/linkedin</td>
                      <td>slack</td>
                      <td>client</td>
                      <td>200</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Refresh</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>

                      </td>
                    </tr>

                    <tr>
                      <td>Slack</td>
                      <td>www.slack.com/careers</td>
                      <td>www.slack.com/linkedin</td>
                      <td>slack</td>
                      <td>client</td>
                      <td>200</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Refresh</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>

                      </td>
                    </tr>

                    <tr>
                      <td>Slack</td>
                      <td>www.slack.com/careers</td>
                      <td>www.slack.com/linkedin</td>
                      <td>slack</td>
                      <td>client</td>
                      <td>200</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Refresh</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>

                      </td>
                    </tr>

                    <tr>
                      <td>Slack</td>
                      <td>www.slack.com/careers</td>
                      <td>www.slack.com/linkedin</td>
                      <td>slack</td>
                      <td>client</td>
                      <td>200</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Refresh</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>

                      </td>
                    </tr>

                    <tr>
                      <td>Slack</td>
                      <td>www.slack.com/careers</td>
                      <td>www.slack.com/linkedin</td>
                      <td>slack</td>
                      <td>client</td>
                      <td>200</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Refresh</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>

                      </td>
                    </tr>

                    <tr>
                      <td>Slack</td>
                      <td>www.slack.com/careers</td>
                      <td>www.slack.com/linkedin</td>
                      <td>slack</td>
                      <td>client</td>
                      <td>200</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Refresh</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>

                      </td>
                    </tr>

                    <tr>
                      <td>Slack</td>
                      <td>www.slack.com/careers</td>
                      <td>www.slack.com/linkedin</td>
                      <td>slack</td>
                      <td>client</td>
                      <td>200</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Refresh</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>

                      </td>
                    </tr>
                   
                  </tbody>
                </table>
                {/*<ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">4</a></li>
                  <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>*/}
              </div>
            </div>
          </div>
        </div>

        

      </div>

    )
  }
}

export default Tables;
