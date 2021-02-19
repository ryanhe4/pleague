export const createAuthEmail = (registered: boolean, code: string) => {
  const keywords = registered
    ? {
      type: 'email-login',
      text: '로그인'
    }
    : {
      type: 'register',
      text: '회원가입'
    }

  const subject = `pLeague ${keywords.text}`
  const body = `<a href='https://xploitdev.com'><img src='https://kinsta.com/wp-content/uploads/2017/04/email-authentication-768x384.png' style='display: block; width: 128px; margin: 0 auto;'/></a>
  <div style='max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #868e96; margin-top: 0.5rem; box-sizing: border-box;'>
    <b style='black'>안녕하세요! </b>${keywords.text}을 계속하시려면 <h2>${code}</h2>를 입력하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면, 이 메일을 무시하세요.
  </div>`

  return {
    subject,
    body
  }
}
