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

const Text = styled.span`
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Roads = () => (
  <Wrapper>
    <CardImg src="assets/roads.jpg">דרכי הגעה / יציאה ליחידה:</CardImg>
    <Root>
      <Text>
        א. קו אגד 301- מגיע לצומת תל נוף. קו זה יוצא מהתחנה המרכזית בת"א לאשקלון החל מהשעה 5:40 כל
        15-30 דק', עובר דרך תחנת הרכבת ברחובות ובכל הצמתים בדרך לבסיס.
      </Text>
      <Text>
        ב. בכל יום בשעה 05:55 יוצא אוטובוס קו 226 של אגד מתחנה מרכזית ת"א לבסיס יא"א 22- שים לב, זהו
        האוטובוס היחיד ביום אשר מגיע ישירות לשער הבסיס!
      </Text>
      <Text>
        ג. בנוסף, קיימים היסעים לאנשי הקבע של הבסיס. לחיילי החובה יש אפשרות לעלות על היסעי הקבע על
        בסיס מקום פנוי.
      </Text>
      <Text>ד. תחנות הרכבת הקרובות לבסיס הינן בערים רחובות ויבנה.</Text>
      <Text>
        ה. טרמפיאדות- ישנה טרמפיאדה אחת, בצומת תל נוף (דרומית) בין השעות 7:00-9:00 נמצא בטרמפיאדה
        קצין/נגד אשר עוצר לחיילים טרמפים לתוך הבסיס. חשוב!!! אין לעצור טרמפים ללא נוכחות של קצין/נגד
        תורן בטרמפיאדה, ומבלי שהוצג בפניך חוגר ואישור כניסה לבסיס תל נוף של הרכב שעצר לך!
      </Text>
      <Text>
        ו. כמו כן, ישנן הסעות אנשי קבע שאליהן ניתן להצטרף רק ע"ב מקום פנוי. הסעות אנשי קבע- בשעה
        17:30 יוצאות מתוך הבסיס למספר יעדים. כמו כן ניתן לעצור רכבים אך ורק מתוך תחומי הבסיס!
      </Text>
    </Root>
  </Wrapper>
);

export default Roads;
