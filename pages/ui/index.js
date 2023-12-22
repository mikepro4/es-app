
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../components/button";


const TestView = () => {
  const router = useRouter()
  const dispatch = useDispatch();


  return (
    <div className="ui-screen page-wrapper">

      <div className="page-container">

        <h1>UI System</h1>
        <div className="button-group">
          <li>
            <Button
              small={true}
              label="Buttons"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/buttons")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Forms"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/forms")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Custom icons"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/icons")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Loader"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/loader")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Popups"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/popups")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Infinite list"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/infinite_list")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Labels"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/labels")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Login"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/login")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Signup"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/signup")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="AudioPlayer"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/audioPlayer")
              }}
            />
          </li>
          <li>
            <Button
              small={true}
              label="AudioPlayer"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/audioPlayer")
              }}
            />
          </li>
          <li>
            <Button
              small={true}
              label="Pyramid"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/pyramid")
              }}
            />
          </li>
          <li>
            <Button
              small={true}
              label="VoiceToGPT"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/audio_api_test")
              }}
            />
          </li>
        </div>

      </div>


    </div>
  );
};

export default TestView;
