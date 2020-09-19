import React, { Component } from 'react';
import './App.scss';
const axios = require('axios');

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      name: '',
      status: '',
      statuses: []
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
          <form className="split-pane" id="status-update" onSubmit={e => e.preventDefault()}>
            <label>Full Name<br />
              <input type="text" placeholder="John" name="name" id="name"/>
            </label>
            <br />
            {/* <label >Status<br /> */}
            <input type="text" placeholder="Status" name="status" id="status"/>
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
          {
            this.state.statuses && this.state.statuses.map((rec, index) => {
              return (<tr key={index}><td>{rec.name}</td><td>{rec.status}</td></tr>)
            }) || null
          }

          </tbody>
        </table>

      </main>
    );
  }

  async _submit() {
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;

    if(!name || !status) {
      return;
    }


    const res = await axios.post('http://localhost:3001/status/set', {name, status}, {mode:'cors'});
    // const res = await axios.post('http://localhost:3001/status/set', JSON.stringify({name, status}, {mode:'cors'}));
    await this.pullStatuses();

  }

  async componentDidMount() {
    await this.pullStatuses();
  }

  async pullStatuses() {
    let res;
    try {
      res = await axios.get('http://localhost:3001/status/getAll');
    } catch(e) {
      console.error( 'Failed to retrieve: ', e);
    }

    return this.setState({ statuses: res.data });
  }
}

export default App;
