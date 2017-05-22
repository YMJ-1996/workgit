
// LeftView.cpp : CLeftView ���ʵ��
//

#include "stdafx.h"
#include "READER.h"

#include "READERDoc.h"
#include "LeftView.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CLeftView

IMPLEMENT_DYNCREATE(CLeftView, CTreeView)

BEGIN_MESSAGE_MAP(CLeftView, CTreeView)
END_MESSAGE_MAP()


// CLeftView ����/����

CLeftView::CLeftView()
{
	EnableActiveAccessibility();
	// TODO:  �ڴ˴����ӹ������
}

CLeftView::~CLeftView()
{
}

BOOL CLeftView::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO:  �ڴ˴�ͨ���޸� CREATESTRUCT cs ���޸Ĵ��������ʽ

	return CTreeView::PreCreateWindow(cs);
}

void CLeftView::OnInitialUpdate()
{
	CTreeView::OnInitialUpdate();

	// TODO:  ���� GetTreeCtrl() ֱ�ӷ��� TreeView �����ؼ���
	//  �Ӷ������������ TreeView��
}


// CLeftView ���

#ifdef _DEBUG
void CLeftView::AssertValid() const
{
	CTreeView::AssertValid();
}

void CLeftView::Dump(CDumpContext& dc) const
{
	CTreeView::Dump(dc);
}

CREADERDoc* CLeftView::GetDocument() // �ǵ��԰汾��������
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CREADERDoc)));
	return (CREADERDoc*)m_pDocument;
}
#endif //_DEBUG


// CLeftView ��Ϣ��������