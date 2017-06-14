import React, { Component } from 'react';

class Tables extends Component {
  render() {
    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Users Table
              </div>

              <div className="card-block">
                <table className="table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Comapny Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Micheal</td>
                      <td>Owen</td>
                      <td>micheal@gmail.com</td>
                      <td>fusemachines</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Micheal</td>
                      <td>Owen</td>
                      <td>micheal@gmail.com</td>
                      <td>fusemachines</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Micheal</td>
                      <td>Owen</td>
                      <td>micheal@gmail.com</td>
                      <td>fusemachines</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Micheal</td>
                      <td>Owen</td>
                      <td>micheal@gmail.com</td>
                      <td>fusemachines</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Micheal</td>
                      <td>Owen</td>
                      <td>micheal@gmail.com</td>
                      <td>fusemachines</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
                        <span className="badge badge-primary">Delete</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Micheal</td>
                      <td>Owen</td>
                      <td>micheal@gmail.com</td>
                      <td>fusemachines</td>
                      <td>
                        <span className="badge badge-primary">Edit</span>&nbsp;
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
