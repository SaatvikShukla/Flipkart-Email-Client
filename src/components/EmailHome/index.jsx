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
      resp.list.forEach(item => {
        item.isRead = false;
        item.isFavourite = false;
      });
      setUserEmails(resp.list);
      setUserEmailsCount(resp.total);
    })

  }, []);

  function emailCardClickHandler(data) {

    // get full email
    getEmailDataWithId({ id: data.id }).then(resp => {
      console.log('resp', resp);
      setShowDetailedEmail(true);
      setCurrentEmailDetails(resp);
    })

    // set current email as read
    let _userEmails = [...userEmails];
    _userEmails[_userEmails.findIndex(item => item.id === data.id)].isRead = true;
    setUserEmails(_userEmails);
  }

  return (
    <>
      <div className={"pageWrapper"}>
        <ShowIfPropTrue prop={showDetailedEmail}>
          <div className={"detailedEmailWrapper"}>
            {/* Temporarily set inner html,
            TODO later
             */}
            {/* <div>
              <div className="user-avatar">{item.from.name.charAt(0)}</div>
              <div>From : <b>{item.from.name} {"<" + item.from.email + ">"} </b></div>
            </div> */}
            <div dangerouslySetInnerHTML={{ __html: currentEmailDetails.body }} />
          </div>
        </ShowIfPropTrue>
        <div className={"emailCardWrapper"}>
          {userEmails.map((item) => {
            console.log(item);
            return (
              <>
                <div
                  className={"emailCard" +
                    (showDetailedEmail === true ? " halfScreenView" : '') +
                    (item.isRead === true ? " readEmail" : '')
                  }
                  onClick={() => { emailCardClickHandler(item) }}
                >
                  <div className="user-avatar">{item.from.name.charAt(0)}</div>
                  <div>From : <b>{item.from.name} {"<" + item.from.email + ">"} </b></div>
                  <div>Subject <b> : {item.subject} </b></div>
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