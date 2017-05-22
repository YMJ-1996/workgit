
// READERView.cpp : CREADERView ���ʵ��
//

#include "stdafx.h"
// SHARED_HANDLERS ������ʵ��Ԥ��������ͼ������ɸѡ�������
// ATL ��Ŀ�н��ж��壬�����������Ŀ�����ĵ����롣
#ifndef SHARED_HANDLERS
#include "READER.h"
#endif

#include "READERDoc.h"
#include "READERView.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CREADERView

IMPLEMENT_DYNCREATE(CREADERView, CFormView)

BEGIN_MESSAGE_MAP(CREADERView, CFormView)
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()
END_MESSAGE_MAP()

// CREADERView ����/����

CREADERView::CREADERView()
	: CFormView(CREADERView::IDD)
{
	EnableActiveAccessibility();
	// TODO:  �ڴ˴���ӹ������

}

CREADERView::~CREADERView()
{
}

void CREADERView::DoDataExchange(CDataExchange* pDX)
{
	CFormView::DoDataExchange(pDX);
}

BOOL CREADERView::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO:  �ڴ˴�ͨ���޸�
	//  CREATESTRUCT cs ���޸Ĵ��������ʽ

	return CFormView::PreCreateWindow(cs);
}

void CREADERView::OnInitialUpdate()
{
	CFormView::OnInitialUpdate();
	ResizeParentToFit();

}

void CREADERView::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void CREADERView::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}


// CREADERView ���

#ifdef _DEBUG
void CREADERView::AssertValid() const
{
	CFormView::AssertValid();
}

void CREADERView::Dump(CDumpContext& dc) const
{
	CFormView::Dump(dc);
}

CREADERDoc* CREADERView::GetDocument() const // �ǵ��԰汾��������
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CREADERDoc)));
	return (CREADERDoc*)m_pDocument;
}
#endif //_DEBUG


// CREADERView ��Ϣ�������
