import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/file.svg' }, title: 'Log In' };

export default function LogInView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
        <form className="login-form">
            <img style={{ width: '100%' }} src="images/movie_reel.png" />
            <div className="input">
                <label>Email</label>
                <br />
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                />
            </div>

            <div className="input">
                <label>Password</label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="**********"
                />
            </div>

            <a href="/">
                <input className="sign-in" value="Sign In" />
            </a>

            <div className="redirect">
                <a href="/forgotPassword">Forgot Password</a>
                <a href="/sign-up">Sign Up</a>
            </div>
        </form>
        <a href="/join-group">
          <button className="guest-btn">Continue as Guest</button>
        </a>
    </div>
  );
}
