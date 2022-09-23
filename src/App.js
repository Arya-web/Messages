import './App.css';
import './Message.css';
import db from './firebase';
import { doc, setDoc, collection, onSnapshot, query, Timestamp, orderBy } from "firebase/firestore";
import Message from "./Message";
import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import FlipMove from 'react-flip-move';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


function App() {
  // useState is for variables
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState([]);
  const [userName, setUserName] = useState('');

  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const auth = getAuth();
  auth.languageCode = 'it';

  //run code on condition
  useEffect(() => {
    setUserName(prompt('Please Enter your Name'));
  }, []  /*condition if empty then runs once when app loads*/)

  //this is used to pull from a collection 
  /*useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }, [])*/

  //everytime the doc changes
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const text = [];
      querySnapshot.forEach((doc) => { text.push(doc.data()); })
      setMsg(text);
    });
  }, [])

  const sendMsg = (e) => {
    e.preventDefault();
    const q = doc(collection(db, 'messages'));
    setDoc(q, {
      msgs: input,
      userName: userName,
      timestamp: Timestamp.now()
    })

    setInput('');
  }
  return (
    <div className="App">
      <h1>Messenger</h1>

      <div>
        <button type="button"
          onClick={() => {

            signInWithPopup(auth, provider)
              .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                // ...
              }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
              });

          }
          }>Click to login</button>
      </div>

      <hr />

      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">your message here...</InputLabel>
          <Input id="myInput" value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" onClick={sendMsg} disabled={!input}>Submit</Button>
      </form>
      <FlipMove>
        {msg.map((msgs, i) =>
          <Message key={i - 1} userName={userName} msg={msgs} />
        )}
      </FlipMove>
    </div>
  );
}

export default App;
