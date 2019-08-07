import React from 'react';
import styled from 'styled-components';
import {CardImg} from 'shared/components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  padding: 30px;
`;

const Header = styled.h1`
  text-decoration: underline;
  line-height: 1.2;
  font-size: 38px;
  text-align: center;
`;

const Text = styled.span`
  font-size: 18px;
  margin-top: 8px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Defense = () => (
  <Wrapper>
    <CardImg src="assets/purpose.jpeg">חזון היחידה</CardImg>
    <Root>
      <Text>
        יחידה אחת מובילה ויוזמת, בחזית הטכנולוגיה והאיכות. אבן הראשה בהשגת עצמאות אחזקתית והשאת
        הזמינות לסד״כ חיל האוויר. אנשים מצויינים שותפים למשימות החיל,
      </Text>
    </Root>
    <CardImg src="assets/vision.jpeg">ייעוד היחידה</CardImg>
    <Root>
      <Text>
        יחידה המתמחה בתחזוקה והשבחה של כלי טיס ומכוללים ברמת דרג ד׳, תוך פיתוח ידע, מתן פתרונות
        הנדסיים, ושימוש ביכולות ייצור מתקדמות למתן עצמאות הורדת עלויות הקיום של חיל האוויר במימוש
        משימותיו ויעדיו
      </Text>
    </Root>
  </Wrapper>
);

export default Defense;
