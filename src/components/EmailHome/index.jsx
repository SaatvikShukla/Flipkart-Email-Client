import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './index.css';
import { getEmails, getEmailDataWithId } from "./emailHome.service";
import ShowIfPropTrue from '../../util/ShowIfPropTrue';

export default function EmailHome() {
  const [userEmails, setUserEmails] = useState([]);
  const [showDetailedEmail, setShowDetailedEmail] = useState(false);
  const [currentEmailDetails, setCurrentEmailDetails] = useState([]);
  const [userEmailsCount, setUserEmailsCount] = useState([]);

  useEffect(() => {
    getEmails().then(resp => {
      setUserEmails(resp.list);
      setUserEmailsCount(resp.total);
    })

  }, []);

  function emailCardClickHandler(id) {
    getEmailDataWithId({ id: id }).then(resp => {
      console.log('resp', resp);
      setShowDetailedEmail(true);
      setCurrentEmailDetails(resp);
    })
  }

  return (
    <>
      <div className={"pageWrapper"}>
        <ShowIfPropTrue prop={showDetailedEmail}>
          <div className={"detailedEmailWrapper"}>
            {currentEmailDetails.body}
          </div>
        </ShowIfPropTrue>
        <div className={"emailCardWrapper"}>
          {userEmails.map((item) => {
            console.log(item);
            return (
              <>
                <div className={"emailCard" + (showDetailedEmail === true ? " halfScreenView" : '')} onClick={() => { emailCardClickHandler(item.id) }}>
                  <div className="user-avatar">{item.from.name.charAt(0)}</div>
                  <div>From : {item.from.name} {"<" + item.from.email + ">"}</div>
                  <div>Subject : {item.subject} </div>
                  <div>{item.short_description}</div>
                  <div>{moment(item.date).format('DD/MM/YYYY HH:MM')}</div>
                </div>
              </>);
          })}
        </div>
      </div>
    </>
  );
}