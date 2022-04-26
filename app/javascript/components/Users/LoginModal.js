import React from "react";
import { Modal } from "@mantine/core";
import SessionsNew from "./SessionsNew";

const LoginModal = ({ opened, setOpened }) => {
  return (
    <Modal opened={opened} onClose={() => setOpened(false)}>
      <SessionsNew />
    </Modal>
  );
};

export default LoginModal;

// <p class="notice"></p>
// <p class="alert"></p>

// <form class="new_user" id="new_user" action="/users/sign_in" accept-charset="UTF-8" method="post">
// <input type="hidden" name="authenticity_token" value="noYQX8GTgdEHBUtTgvxLDWP9JwfP11EPLopRUN3CwrQowYbAmVI4xItiOmppaZdA899zjB9UswgmNutfvPiong" autocomplete="off"/>
// <div class="field">
// <label for="user_email">Email</label>
//   <input autofocus="autofocus" autocomplete="email" type="email" value="" name="user[email]" id="user_email"/>
// </div>

// <div class="field">
// <label for="user_password">Password</label>
//   <input autocomplete="current-password" type="password" name="user[password]" id="user_password"/>
// </div>

// <div class="field">
//   <input name="user[remember_me]" type="hidden" value="0" autocomplete="off"/>
//     <input type="checkbox" value="1" name="user[remember_me]" id="user_remember_me"/>
//   <label for="user_remember_me">Remember me</label>
// </div>

// <div class="actions">
// <input type="submit" name="commit" value="Log in" data-disable-with="Log in"/>
// </div>
// </form>

// <a href="/users/sign_up">Sign up</a>
// <a href="/users/password/new">Forgot your password?</a>
