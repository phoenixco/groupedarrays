import React from "react";
import Persons from "./Persons";
import { TextField, Button, Grid } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import PersonsClass from "./PersonsClass";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      add: [],
      age: "",
      name: "",
      movies: "",
      newPerson: new PersonsClass()
    };
  }

  addNew = (event, id, age) => {
    const newid = this.state.persons.length + 1;
    let ag = this.state.age;

    console.log(ag);
    let newPerson = {
      id: newid,
      age: ag,
      person: {
        name: this.state.name,
        hobby: {
          sport: "football",
          movie: this.state.movies,
          site: "google"
        }
      }
    };
    const add = this.state.add;
    const size = add.length + 1;

    this.setState({
      add: add.concat(size),
      persons: this.state.persons.concat(newPerson)
    });
  };

  handleChange = input => event => {
    this.setState(
      { [input]: event.target.value }
      //() => { this.validateField(name, value) }
    );

    console.log(this.state.age);
  };

  // handleAdd = id => {
  //   const newid = this.state.persons.length + 1;
  //   let newPerson = {
  //     id: newid,
  //     age: this.state.age,
  //     person: {
  //       name: this.state.name,
  //       hobby: {
  //         sport: "football",
  //         movie: this.state.movies,
  //         site: "google"
  //       }
  //     }
  //   };

  //   this.setState({ persons: this.state.persons.concat(newPerson) });
  //   console.log(newPerson);
  // };

  deleteAgeGroup = age => {
    const items = this.state.persons.filter(person => person.age !== age);
    this.setState({ persons: items });
  };

  deletePerson = id => {
    const items = this.state.persons.filter(person => person.id !== id);
    this.setState({ persons: items });
  };

  componentWillMount() {
    this.setState({
      persons: [
        {
          id: 1,
          age: 25,
          person: {
            name: "John",
            hobby: {
              sport: "football",
              movie: "king speech",
              site: "CSS tricks"
            }
          }
        },
        {
          id: 2,
          age: 18,
          person: {
            name: "Suzi",
            hobby: {
              sport: "hockey",
              movie: "king kong",
              site: "google"
            }
          }
        },
        {
          id: 3,
          age: 23,
          person: {
            name: "Joe",
            hobby: {
              sport: "football",
              movie: "iron lady",
              site: "nikpro"
            }
          }
        },
        {
          id: 4,
          age: 25,
          person: {
            name: "Rosi",
            hobby: {
              sport: "football",
              movie: "martian",
              site: "nikpro"
            }
          }
        },
        {
          id: 5,
          age: 25,
          person: {
            name: "Gary",
            hobby: {
              sport: "swimming",
              movie: "GOD father",
              site: "google"
            }
          }
        },
        {
          id: 6,
          age: 23,
          person: {
            name: "Kane",
            hobby: {
              sport: "football",
              movie: "interstellar",
              site: "google"
            }
          }
        }
      ]
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.state.persons !== newProps.persons) {
      this.setState({ persons: newProps.persons });
    }
  }

  groupBy = (array, key) => {
    return array.reduce(function(accumulator, item) {
      (accumulator[item[key]] = accumulator[item[key]] || []).push(item);
      return accumulator;
    }, {});
  };

  render() {
    // const personssec = this.state.personssec;
    let persons = this.state.persons;
    let groupedPeople = this.groupBy(persons, "age");
    let age = this.state.age;
    return (
      <React.Fragment>
        <Grid>
          <Button
            onClick={e => this.addNew(age)}
            style={{ marginTop: 30, marginLeft: 500 }}
          >
            <Icon>+</Icon> Add Main
          </Button>
          {this.state.add.map(index => {
            return (
              <Grid>
                <TextField
                  id="preference"
                  label="Age"
                  name="age"
                  value={this.state.age}
                  onChange={this.handleChange("age")}
                  margin="normal"
                />
                <p>{this.state.age}</p>
                <p>{this.state.name}</p>
                <p>{this.state.movies}</p>
                <TextField
                  id="preference"
                  label="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                  margin="normal"
                />
                <TextField
                  id="preference"
                  label="Favourite Movie"
                  name="movies"
                  value={this.state.movies}
                  onChange={this.handleChange("movies")}
                  margin="normal"
                />
                {Object.keys(groupedPeople).map((key, index) => {
                  let group = groupedPeople[key];

                  console.log(index + 1);
                  return (
                    <div key={index}>
                      <h3>{key}</h3>
                      <Persons
                        key={key}
                        values={group}
                        deletePerson={this.deletePerson}
                      />
                      <button onClick={e => this.deleteAgeGroup(parseInt(key))}>
                        Delete
                      </button>
                      <button onClick={e => this.handleAdd(key)}>Add</button>
                    </div>
                  );
                })}
                <Button onClick={this.addChildInputField}> Add Inner</Button>
              </Grid>
            );
          })}
        </Grid>

        {/* <button onClick={e => this.handleAdd(27)}>Add Main button</button> */}

        {/* {Object.keys(groupedPeople).map((key, index) => {
          let group = groupedPeople[key];

          console.log(index + 1);
          return (
            <div key={index}>
              <h3>{key}</h3>
              <Persons
                key={key}
                values={group}
                deletePerson={this.deletePerson}
              />
              <button onClick={e => this.deleteAgeGroup(parseInt(key))}>
                Delete
              </button>
              <button onClick={e => this.handleAdd(key)}>Add</button>
            </div>
          );
        })} */}
      </React.Fragment>
    );
  }
}

export default App;
