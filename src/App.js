import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      name: '',
      status: ''
    }

    this.submit = this._submit.bind(this);
  }

  render () {
    return (
      <main className="app">
        <header className="app-header">
          <h1>Status Update</h1>
          <p className="app-subheader">
            Please update your name and status.
          </p>
        </header>
        <section>
          <article className="text-content split-pane">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.
            </p>
          </article>
          <form className="split-pane" action="localhost://3001/status/set" method="post" id="status-update">
            <label>Full Name<br />
              <input type="text" placeholder="John" name="name" required/>
            </label>
            <br />
            {/* <label >Status<br /> */}
            <input type="text" placeholder="Status" name="status" required/>
          </form>
        </section>
        <button className="submit" onClick={this.submit}>Submit</button>
        
        <h2>Status History</h2>
        <table>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Status
              </th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>

      </main>
    );
  }

  async _submit() {
    console.log('this ', this.state)
    const res = await document.getElementById('status-update').submit();
    console.log('res is ', res)
  }

  componentDidMount() {
    fetch("localhost:3001/status/getAll")
      .then( res => {
        console.log('res is ', res)
      })
      .catch(err => {
        console.error('err is ',err)
      })
  }
}

export default App;
