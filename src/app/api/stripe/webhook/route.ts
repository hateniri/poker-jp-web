import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // イベントタイプに応じて処理
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('決済完了:', session);
      // ここで店舗の登録処理を行う
      await handleSubscriptionCreated(session);
      break;

    case 'customer.subscription.updated':
      const subscription = event.data.object;
      console.log('サブスクリプション更新:', subscription);
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      console.log('サブスクリプション解約:', deletedSubscription);
      await handleSubscriptionCanceled(deletedSubscription);
      break;

    default:
      console.log(`処理しないイベントタイプ: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  // セッションから店舗情報を取得
  const storeName = session.metadata?.storeName;
  const customerEmail = session.customer_email;

  // TODO: ここで実際の店舗登録処理を実装
  // 1. 認証コードを生成
  // 2. メールで認証コードを送信
  // 3. stores.jsonを更新してサブスクリプションステータスを有効化

  console.log(`新規サブスクリプション: ${storeName} (${customerEmail})`);
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  // TODO: 店舗のサブスクリプションステータスを無効化
  console.log(`サブスクリプション解約: ${subscription.id}`);
}