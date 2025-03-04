import { MongoOutLink } from '@fastgpt/service/support/outLink/schema';
import { POST } from '@fastgpt/service/common/api/plusRequest';
import { NextAPI } from '@/service/middleware/entry';
import { OutLinkErrEnum } from '@fastgpt/global/common/error/code/outLink';

export type AuthOutLinkInitProps = {
  outLinkUid: string;
  tokenUrl?: string;
};
export type AuthOutLinkResponse = {
  uid: string;
};

const handler = async (req: any): Promise<AuthOutLinkResponse | undefined> => {
  const { outLinkUid, tokenUrl } = req.query as AuthOutLinkInitProps;
  //console.log(outLinkUid, tokenUrl)
  if (tokenUrl) {
    try {
      const authRes = await POST<{ uid: string }>(`${tokenUrl}/shareAuth/init`, {
        token: outLinkUid
      });
      //console.log('authRes', authRes)
      return {
        uid: authRes.uid
      };
    } catch (error) {
      console.error('Auth init failed:', error);
      throw new Error(OutLinkErrEnum.linkUnInvalid);
    }
  }
};

// URL验证函数示例
async function validateTokenUrl(url: string) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

export default NextAPI(handler);
