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
  text-align: center;
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
const Defense = () => (
  <Wrapper>
    <CardImg src="assets/alarm.jpg">סדר פעולות לחייל בזמן כוננות ספיגה</CardImg>
    <Root>
      <Text>
        1. מרגע שמיעת אזעקה עולה ויורדת עליך לפעול באופן מידי על פי סדר הפעולות הבא: היכנס למרחב
        ממוגן ע"פ השילוט המוצב באזור הימצאותך.
      </Text>
      <Text>
        2. במידה ולא קיים מבנה ממוגן או שמרחק ההגעה אליו עולה על דקה- עליך תפוס מחסה הנמצא קרוב ככל
        הניתן (מעברי מים\תעלות, מחסות בטון וכד') ולהגן בידיך על ראשך.
      </Text>
      <Text>
        3. במידה והנך נמצא בכלי רכב- יש לעצור את הרכב באופן מידי ולתפוס מחסה הסמוך ככל הניתן ובמידה
        ואין, יש לשכב על הרצפה ולהגן בידיך על ראשך.
      </Text>
      <Text>4. יש לעדכן את אחראי המבנה הממוגן על נוכחותך על מנת שיעדכן זאת בשיבוץ הקרבי.</Text>
      <Text>
        5. זמן משוער של התמשכות מטח טילים עומד על 15 דק' ואין לצאת מהמרחב המוגן עד לאישור האחראי
        במרחב.
      </Text>
    </Root>
    <CardImg src="assets/fire.jpeg">גורמים אופיינים לדליקות:</CardImg>
    <Root>
      <Text>רשלנות ואי זהירות.</Text>
      <Text>אש גלויה בקרבת חומרים דליקים.</Text>
      <Text>משחקים באש.</Text>
      <Text>חוטי חשמל ומכשירי חשמל פגומים.</Text>
      <Text>עומס יתר על רשת חשמל.</Text>
      <Text>אלתורי חשמל.</Text>
      <Text>מגע בין חומרים כימיים הגורמים לפריצת אש.</Text>
      <Text>לחץ פתאומי של גורם וחומרים (מכבש).</Text>
      <Text>איתני טבע (ברק, הר געש, ריכוז קרני שמש)</Text>
    </Root>
    <CardImg src="assets/doanddont.png">עשה ואל תעשה בכיבוי דליקות</CardImg>
    <Root>
      <Text>גילית דליקה. פעל מיד לכיבויה.</Text>
      <Text>הזעק מיד את חיילי היחידה.</Text>
      <Text>נתק את מקור זרם החשמל למוקד האש.</Text>
      <Text>פעל בהתאם לסוג השריפה: מוצקים, נוזלים, גזים, או חשמל.</Text>
      <Text>הפעל את ציוד הכיבוי המתאים, מטפים, זרנוקי מים, מחבטים וכו'.</Text>
      <Text>באם השרפה גדולה הזעק מיד את מכבי האש מס' טלפון הארצי 102</Text>
      <Text>סייע לכבאים בכיבוי הדליקה ואל תפריע</Text>
    </Root>
  </Wrapper>
);

export default Defense;
