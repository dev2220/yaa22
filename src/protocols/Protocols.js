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
const Rules = () => (
  <Wrapper>
    <CardImg src="assets/rules.png"> נהלי יחידה</CardImg>
    <Root>
      <b>כללי:</b>
      <Text>
        השירות ביחידה הינו ברמת פעילות ד', ניתן ללון במגורי החיילים בבסיס. יציאה בתנאי "יומיות" –
        באישור מפקדים. שעות הפעילות- 7:30-17:15. מסדר בוקר ייערך בשעה 7:30.
      </Text>
      <b>מרפאה:</b>
      <Text>
        שעות פתיחה: א'-ה' 8:00-12:00, 13:00-17:00, לאחר מכן פועלת במתכונת חירום. בימים ו'- ש' – רק
        במקרי חרום. קביעת תורים למרפאה- דרך המפקד הישיר בלבד!
      </Text>
      <b>מרפאת שיניים:</b>
      <Text>שעות פתיחה: א'-ה' 08:00-16:30</Text>
      <b>אפסנאות</b>
      <Text>
        שעות פתיחה: א'-ה' 8:00-17:00, באפסנאות ניתן לחתום על ציוד ב', להחליף נעלים בלאי, לקבל מדי א,
        ולהגיש כביסה.
      </Text>
      <b>מספרה</b>
      <Text>
        המספרה נמצאת ליד השק"ם והקולנוע. חייל המעוניין להשתמש בשירותי המספרה, נדרש לקבוע תור עם הספר
        ולהגיע להסתפר בזמן הנקבע. שירותי המספרה ניתנים חינם לחיילי הבסיס.
      </Text>
      <b>זמני ארוחות - חדר אוכל</b>
      <Text>ארוחת הצהריים היא בין השעות 11:30-13:00.</Text>
    </Root>
  </Wrapper>
);

export default Rules;
