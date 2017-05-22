
// READERView.cpp : CREADERView 类的实现
//

#include "stdafx.h"
// SHARED_HANDLERS 可以在实现预览、缩略图和搜索筛选器句柄的
// ATL 项目中进行定义，并允许与该项目共享文档代码。
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

// CREADERView 构造/析构

CREADERView::CREADERView()
	: CFormView(CREADERView::IDD)
{
	EnableActiveAccessibility();
	// TODO:  在此处添加构造代码

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
	// TODO:  在此处通过修改
	//  CREATESTRUCT cs 来修改窗口类或样式

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


// CREADERView 诊断

#ifdef _DEBUG
void CREADERView::AssertValid() const
{
	CFormView::AssertValid();
}

void CREADERView::Dump(CDumpContext& dc) const
{
	CFormView::Dump(dc);
}

CREADERDoc* CREADERView::GetDocument() const // 非调试版本是内联的
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CREADERDoc)));
	return (CREADERDoc*)m_pDocument;
}
#endif //_DEBUG


// CREADERView 消息处理程序
